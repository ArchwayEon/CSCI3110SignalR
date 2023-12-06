using Microsoft.AspNetCore.SignalR;

namespace CSCI3110SignalR.Hubs;

public class ApplicationHub : Hub
{
    public async Task SendMessageToAllAsync(string message)
    {
        await Clients.All.SendAsync("Notification", message);
    }
}
