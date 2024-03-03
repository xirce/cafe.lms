using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/lectures")]
public class LecturesController : ControllerBase
{
    private readonly ILecturesManager lecturesManager;

    public LecturesController(ILecturesManager lecturesManager)
    {
        this.lecturesManager = lecturesManager;
    }

    [HttpGet("{id}")]
    public async Task<GetLectureResponse> GetLecture(Guid id)
    {
        return await lecturesManager.GetLecture(id);
    }
}

public interface ILecturesManager
{
    Task<GetLectureResponse> GetLecture(Guid id);
}

public record GetLectureResponse(Lecture Lecture);

public class Lecture
{
    public string Title { get; set; }
    public string Content { get; set; }
}
