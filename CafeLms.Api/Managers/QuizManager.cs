using CafeLms.Api.Controllers;
using CafeLms.Api.DataModel;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.EntityFrameworkCore;
using UserUnit = CafeLms.Api.DataModel.UserUnit;
using UserCourse = CafeLms.Api.DataModel.UserCourse;

namespace CafeLms.Api.Managers;

public class QuizManager : IQuizManager
{
    private readonly CafeLmsDbContext dbContext;

    public QuizManager(CafeLmsDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<SaveQuestionResponse> SaveQuestion(SaveQuestionRequest request)
    {
        var question = await dbContext.Questions.FirstOrDefaultAsync(
            u => u.QuizId == request.QuizId && u.Id == request.QuestionId);

        if (question is null)
        {
            question = new QuestionInternalModel { QuizId = request.QuizId };
            await dbContext.Questions.AddAsync(question);
        }

        question.Content = request.Content;
        question.Order = request.Order;
        question.AnswerType = AnswerType.SingleCorrect;

        await dbContext.SaveChangesAsync();

        return new SaveQuestionResponse
        {
            QuestionId = question.Id,
            QuizId = question.QuizId
        };
    }

    public async Task<SaveAnswerResponse> SaveAnswer(SaveAnswerRequest request)
    {
        var question = await dbContext.Questions.FindAsync(request.QuestionId);

        var answer = question.Answers.FirstOrDefault(a => a.Id == request.AnswerId);

        if (answer is null)
        {
            answer = new Answer { QuestionId = question.Id };
            question.Answers.Add(answer);
        }

        answer.Content = request.Content;
        answer.Order = request.Order;

        if (request.IsCorrect)
            question.CorrectAnswer = new List<Guid> { answer.Id };
        
        await dbContext.SaveChangesAsync();

        return new SaveAnswerResponse
        {
            QuestionId = answer.QuestionId,
            AnswerId = answer.Id,
            Content = answer.Content,
            Order = answer.Order,
            IsCorrect = request.IsCorrect
        };
    }

    public async Task<GetQuizResponse> GetQuiz(Guid quizId)
    {
        var unit = await dbContext.Units.FindAsync(quizId);

        return new GetQuizResponse
        {
            QuizId = unit.Id,
            Title = unit.Title,
            Questions = unit.Questions.OrderBy(q => q.Order).ToArray()
        };
    }

    public async Task<SubmitQuizResponse> SubmitQuiz(SubmitQuizRequest request)
    {
        var unit = await dbContext.Units.FindAsync(request.QuizId);

        var answerResults = request.Answers
            .Join(
                unit.Questions,
                attempt => attempt.QuestionId,
                question => question.Id,
                (attempt, question) => new AnswerAttemptWithResult
                {
                    QuestionId = question.Id,
                    Answer = attempt.Answer,
                    IsCorrect = attempt.Answer.ToHashSet().SetEquals(question.CorrectAnswer),
                    IncorrectAnswerIds = attempt.Answer.Except(question.CorrectAnswer).ToArray()
                })
            .ToArray();

        var attempt = new QuizAttempt
        {
            QuizId = unit.Id,
            UserId = request.UserId,
            AttemptDateTime = DateTime.UtcNow,
            Answers = answerResults,
            IsCorrect = answerResults.All(a => a.IsCorrect)
        };
        await dbContext.QuizAttempts.AddAsync(attempt);

        var userUnit = await dbContext.UserUnits.FindAsync(request.UserId, unit.Id);
        if (userUnit is null)
        {
            userUnit = new UserUnit
            {
                UserId = request.UserId,
                UnitId = unit.Id,
                Status = attempt.IsCorrect ? UserUnitStatus.Done : UserUnitStatus.InProgress
            };
            await dbContext.UserUnits.AddAsync(userUnit);
        }

        if (attempt.IsCorrect)
            userUnit.Status = UserUnitStatus.Done;

        var course = await dbContext.Courses
            .Include(c => c.Units)
            .FirstAsync(c => c.Id == unit.CourseId);

        var userCourse = await dbContext.UserCourses.FindAsync(request.UserId, unit.CourseId);
        if (userCourse is null)
        {
            userCourse = new UserCourse
            {
                UserId = request.UserId,
                CourseId = unit.CourseId,
                Status = CourseStatus.InProgress
            };
            await dbContext.UserCourses.AddAsync(userCourse);
        }

        var doneUnitsCount = await dbContext.UserUnits
            .Include(u => u.Unit)
            .CountAsync(u => u.Unit.CourseId == unit.CourseId && u.Status == UserUnitStatus.Done);

        if (doneUnitsCount >= course.Units.Count - 1 && userUnit.Status is UserUnitStatus.Done)
            userCourse.Status = CourseStatus.Completed;

        await dbContext.SaveChangesAsync();

        return new SubmitQuizResponse
        {
            QuizId = attempt.QuizId,
            UserId = attempt.UserId,
            Answers = attempt.Answers.ToArray(),
            IsCorrect = attempt.IsCorrect
        };
    }

    public async Task<GetQuizAttemptResponse> GetQuizAttempt(GetQuizAttemptRequest request)
    {
        var attempt = await dbContext.QuizAttempts
            .OrderByDescending(attempt => attempt.AttemptDateTime)
            .FirstOrDefaultAsync(attempt => attempt.UserId == request.UserId && attempt.QuizId == request.QuizId);

        if (attempt is null)
            return null;

        var unit = await dbContext.Units.FindAsync(attempt.QuizId);

        return new GetQuizAttemptResponse
        {
            QuizId = unit.Id,
            Title = unit.Title,
            QuestionsWithAnswers = unit.Questions
                .Join(
                    attempt.Answers,
                    question => question.Id,
                    answer => answer.QuestionId,
                    (question, answerAttempt) => new QuestionWithAnswer
                    {
                        Id = question.Id,
                        Content = question.Content,
                        Order = question.Order,
                        AnswerType = question.AnswerType,
                        Answers = question.Answers.OrderBy(a => a.Order).ToArray(),
                        Answer = answerAttempt.Answer.ToArray(),
                        IsCorrectAnswer = answerAttempt.IsCorrect,
                        IncorrectAnswerIds = answerAttempt.Answer.Except(question.CorrectAnswer).ToArray()
                    })
                .OrderBy(q => q.Order)
                .ToArray(),
            IsCorrect = attempt.IsCorrect,
        };
    }
}
