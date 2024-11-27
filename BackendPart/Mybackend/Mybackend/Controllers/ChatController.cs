using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Mybackend.Models;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub> _chatHubContext;
    private readonly string _connectionString;

    public ChatController(IHubContext<ChatHub> chatHubContext, IConfiguration configuration)
    {
        _chatHubContext = chatHubContext;
        _connectionString = configuration.GetConnectionString("mycon");
    }

    [HttpPost("sendMessage")]
    public async Task<IActionResult> SendMessage(string user, string message, string recipientType, int? targetUserId = null, int? targetGroupId = null)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var query = "INSERT INTO Messages (SenderId, MessageText, Timestamp, RecipientType, TargetUserId, TargetGroupId) VALUES (@SenderId, @Message, @Timestamp, @RecipientType, @TargetUserId, @TargetGroupId)";
            var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@SenderId", user);
            command.Parameters.AddWithValue("@Message", message);
            command.Parameters.AddWithValue("@Timestamp", DateTime.Now);
            command.Parameters.AddWithValue("@RecipientType", recipientType);
            command.Parameters.AddWithValue("@TargetUserId", (object)targetUserId ?? DBNull.Value);
            command.Parameters.AddWithValue("@TargetGroupId", (object)targetGroupId ?? DBNull.Value);

            connection.Open();
            await command.ExecuteNonQueryAsync();
        }

        if (recipientType == "individual")
        {
            await _chatHubContext.Clients.User(targetUserId.ToString()).SendAsync("ReceiveMessage", user, message);
        }
        else if (recipientType == "group")
        {
            await _chatHubContext.Clients.Group(targetGroupId.ToString()).SendAsync("ReceiveMessage", user, message);
        }

        return Ok(new { User = user, Message = message });
    }

    [HttpGet("getChatHistory")]
   // public async Task<IActionResult> GetChatHistory(DateTime? startDate = null, DateTime? endDate = null)
    public async Task<IActionResult> GetChatHistory()
    {
        var chatHistory = new List<ChatMessage>();

        try
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand("GetChatHistory", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

            //    SqlParameter[] parameters = {
            //    new SqlParameter("@StartDate", (object)startDate ?? DBNull.Value),
            //    new SqlParameter("@EndDate", (object)endDate ?? DBNull.Value)
            //};
            //    command.Parameters.AddRange(parameters);

                connection.Open();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        chatHistory.Add(new ChatMessage
                        {
                            Id = reader.GetInt32(0),
                            UserName = reader.GetString(1),
                            Message = reader.GetString(2),
                            Timestamp = reader.GetDateTime(3)
                        });
                    }
                }
            }

            return Ok(chatHistory);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }


}
