using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface IQuizManager
{
    Task<SaveQuestionResponse> SaveQuestion(SaveQuestionRequest request);
    Task<SaveAnswerResponse> SaveAnswer(SaveAnswerRequest request);
    Task<GetQuizResponse> GetQuiz(Guid quizId);
    Task<SubmitQuizResponse> SubmitQuiz(SubmitQuizRequest request);
    Task<GetQuizAttemptResponse> GetQuizAttempt(GetQuizAttemptRequest request);
}
