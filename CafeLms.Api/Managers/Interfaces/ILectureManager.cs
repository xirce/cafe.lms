using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface ILectureManager
{
    Task<SaveLectureResponse> SaveLecture(SaveLectureRequest request);
    Task<GetLectureResponse> GetLecture(Guid unitId);
}
