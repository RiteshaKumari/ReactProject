using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;                  

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message, string recipientType, string targetUser = null, int? targetGroupId = null)
    {
        if (recipientType == "individual" && !string.IsNullOrEmpty(targetUser))
        {
            // Send message to a specific user
            await Clients.User(targetUser).SendAsync("ReceiveMessage", user, message, DateTime.Now.ToString());
        }
        else if (recipientType == "group" && targetGroupId.HasValue)
        {
            // Send message to a specific group
            await Clients.Group(targetGroupId.ToString()).SendAsync("ReceiveMessage", user, message, DateTime.Now.ToString());
        }
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
           // var groupIds = await GetUserGroupIds(userId); // Custom method to fetch user's group IDs
            //foreach (var groupId in groupIds)
            //{
            //    await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
            //}
        }
        await base.OnConnectedAsync();
    }

    //private async Task<List<int>> GetUserGroupIds(string userId)
    //{
    //    // Query the database to get the list of group IDs for the user
    //    // Implement this based on your DB context or repository layer
    //}
}
