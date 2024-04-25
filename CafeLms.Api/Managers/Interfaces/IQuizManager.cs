using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface IQuizManager
{
    Task<SaveQuizResponse> SaveQuiz(SaveQuizRequest request);
    Task<GetQuizResponse> GetQuiz(Guid quizId);
    Task<SubmitQuizResponse> SubmitQuiz(SubmitQuizRequest request);
    Task<GetQuizAttemptResponse> GetQuizAttempt(GetQuizAttemptRequest request);
}
