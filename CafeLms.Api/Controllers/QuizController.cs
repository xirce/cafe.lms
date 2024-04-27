using System.Text.Json.Serialization;
using CafeLms.Api.DataModel;
using CafeLms.Api.Managers.Interfaces;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/quiz")]
public class QuizController : ControllerBase
{
    private readonly IQuizManager quizManager;

    public QuizController(IQuizManager quizManager)
    {
        this.quizManager = quizManager;
    }

    [HttpPost]
    public async Task<SaveQuizResponse> SaveQuiz(SaveQuizRequest request)
    {
        return await quizManager.SaveQuiz(request);
    }

    [HttpGet("{quizId}")]
    public async Task<GetQuizResponse> GetQuiz(Guid quizId)
    {
        return await quizManager.GetQuiz(quizId);
    }

    [HttpGet("{quizId}/attempt")]
    public async Task<GetQuizAttemptResponse> GetQuizAttempt(Guid quizId)
    {
        var request = new GetQuizAttemptRequest(User.GetSubjectId(), quizId);
        return await quizManager.GetQuizAttempt(request);
    }

    [HttpPost("{quizId}/submit")]
    public async Task<SubmitQuizResponse> SubmitQuiz(Guid quizId, SubmitQuizRequest request)
    {
        request = request with { UserId = User.GetSubjectId(), QuizId = quizId };
        return await quizManager.SubmitQuiz(request);
    }
}

public record QuestionOrder
{
    public Guid QuestionId { get; init; }
    public int Order { get; init; }
}

public record SubmitQuizRequest
{
    [JsonIgnore]
    public string? UserId { get; set; }

    [JsonIgnore]
    public Guid QuizId { get; set; }

    public AnswerAttempt[] Answers { get; set; }
}

public class QuestionWithAnswer : Question
{
    public Guid[] Answer { get; set; }
    public bool IsCorrectAnswer { get; set; }
    public Guid[] IncorrectAnswerIds { get; set; }
}

public record SubmitQuizResponse
{
    public string UserId { get; set; }
    public Guid QuizId { get; set; }
    public AnswerAttemptWithResult[] Answers { get; set; }
    public bool IsCorrect { get; set; }
}

public record GetQuizResponse
{
    public Guid QuizId { get; set; }
    public string Title { get; set; }
    public Question[] Questions { get; set; }
}

public record SaveQuizResponse
{
    public Guid QuizId { get; set; }
    public string Title { get; set; }
    public QuestionInternalModel[] Questions { get; set; }
}

public record SaveQuizRequest
{
    public Guid QuizId { get; set; }
    public string Title { get; set; }
    public QuestionInternalModel[] Questions { get; set; }
}

public record GetQuizAttemptRequest(string UserId, Guid QuizId);

public record GetQuizAttemptResponse
{
    public Guid QuizId { get; set; }
    public string Title { get; set; }
    public QuestionWithAnswer[] QuestionsWithAnswers { get; set; }
    public bool IsCorrect { get; set; }
}
