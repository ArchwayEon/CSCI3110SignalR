using CSCI3110SignalR.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CSCI3110SignalR.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly Random _randomNumberGenerator = new();

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult RandomNumber()
    {
        var number = _randomNumberGenerator.Next(1, 1001);
        return Json(number);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}