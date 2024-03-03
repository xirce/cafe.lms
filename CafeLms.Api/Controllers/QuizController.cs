using CafeLms.Api.DataModel;
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

    [HttpGet("{id}")]
    public async Task<GetQuizResponse> GetQuiz(Guid id)
    {
        return await quizManager.GetQuiz(id);
    }
}

public record GetQuizResponse(Quiz Quiz);

public interface IQuizManager
{
    Task<GetQuizResponse> GetQuiz(Guid id);
}

public class Quiz
{
    public string Title { get; set; }
    public Question[] Questions { get; set; }
}