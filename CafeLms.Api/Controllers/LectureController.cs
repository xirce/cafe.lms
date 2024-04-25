using CafeLms.Api.Managers.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/lectures")]
public class LectureController : ControllerBase
{
    private readonly ILectureManager lectureManager;

    public LectureController(ILectureManager lectureManager)
    {
        this.lectureManager = lectureManager;
    }

    [HttpPost]
    public async Task<CreateLectureResponse> SaveLecture(CreateLectureRequest request)
    {
        return await lectureManager.SaveLecture(request);
    }

    [HttpGet("{unitId}")]
    public async Task<GetLectureResponse> GetLecture(Guid unitId)
    {
        return await lectureManager.GetLecture(unitId);
    }
}

public record CreateLectureResponse
{
    public Guid Id { get; init; }
    public string Title { get; set; }
    public string Content { get; set; }
}

public record GetLectureResponse
{
    public Guid Id { get; init; }
    public string Title { get; set; }
    public string Content { get; set; }
}

public record CreateLectureRequest
{
    public string Title { get; set; }
    public string Content { get; set; }
}
