using CafeLms.Api.Controllers;
using CafeLms.Api.DataModel;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Managers;

public class QuizManager : IQuizManager
{
    private readonly CadeLmsDbContext dbContext;

    public QuizManager(CadeLmsDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public Task<SaveQuizResponse> SaveQuiz(SaveQuizRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<GetQuizResponse> GetQuiz(Guid quizId)
    {
        var unit = await dbContext.Units.FindAsync(quizId);

        return new GetQuizResponse
        {
            QuizId = unit.Id,
            Questions = unit.Questions
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
                    IsCorrect = attempt.Answer.Equals(question.CorrectAnswer)
                })
            .ToArray();

        var attempt = new QuizAttempt
        {
            Id = Guid.NewGuid(),
            QuizId = unit.Id,
            UserId = request.UserId,
            AttemptDateTime = DateTime.UtcNow,
            Answers = answerResults,
            IsCorrect = answerResults.All(a => a.IsCorrect)
        };
        await dbContext.QuizAttempts.AddAsync(attempt);
        await dbContext.SaveChangesAsync();

        return new SubmitQuizResponse
        {
            QuizId = attempt.QuizId,
            UserId = attempt.UserId,
            Answers = attempt.Answers,
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
                        Answers = question.Answers,
                        Answer = answerAttempt.Answer,
                        IsCorrectAnswer = answerAttempt.IsCorrect
                    })
                .ToArray(),
            IsCorrect = attempt.IsCorrect
        };
    }
}
