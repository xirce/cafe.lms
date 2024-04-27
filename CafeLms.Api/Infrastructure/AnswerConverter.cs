using System.Text.Json;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CafeLms.Api.Infrastructure;

public class AnswerConverter : ValueConverter<List<Guid>, string>
{
    public AnswerConverter() : base(
        g => JsonSerializer.Serialize(g, JsonSerializerOptions.Default),
        s => JsonSerializer.Deserialize<List<Guid>>(s, JsonSerializerOptions.Default)!)
    {
    }
}
