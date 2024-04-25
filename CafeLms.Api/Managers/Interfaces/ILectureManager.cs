using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface ILectureManager
{
    Task<CreateLectureResponse> SaveLecture(CreateLectureRequest request);
    Task<GetLectureResponse> GetLecture(Guid quizId);
}
