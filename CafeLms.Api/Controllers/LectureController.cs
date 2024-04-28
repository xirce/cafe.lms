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
    public async Task<SaveLectureResponse> SaveLecture(SaveLectureRequest request)
    {
        return await lectureManager.SaveLecture(request);
    }

    [HttpGet("{unitId}")]
    public async Task<GetLectureResponse> GetLecture(Guid unitId)
    {
        return await lectureManager.GetLecture(unitId);
    }
}

public record SaveLectureResponse
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Content { get; init; }
    public int Order { get; init; }
}

public record GetLectureResponse
{
    public Guid Id { get; init; }
    public Guid CourseId { get; init; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string? VideoUrl { get; set; }
    public int Order { get; set; }
}

public record SaveLectureRequest
{
    public Guid? LectureId { get; init; }
    public string Title { get; init; }
    public string Content { get; init; }
    public string? VideoUrl { get; init; }
    public int Order { get; init; }
    public Guid CourseId { get; init; }
}
