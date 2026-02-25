using System;
using System.Security.Cryptography;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{ 
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto){
        var user = new User{
            UserName= registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if(result.Succeeded) return Ok();

        foreach(var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }

        return ValidationProblem();
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if(User.Identity.IsAuthenticated == false) return NoContent();
        var user = await signInManager.UserManager.GetUserAsync(User);
        if(user == null) return Unauthorized();
        return Ok(new
        {
            user.DisplayName,
            user.Email,
            user.Id,
            user.ImageUrl
        });
    }

     [AllowAnonymous]
     [HttpGet("email-exists")]
    public async Task<ActionResult> CheckEmailExistence([FromQuery] string email)
    {
        var user = await signInManager.UserManager.FindByEmailAsync(email);
        if (user!=null)
        {    
            return Conflict("Email already exists");

        }
        else
        {
      return Ok(new
        {
            user?.Email,
        });
        }
       
    }


    [HttpPost("logout")]

    public async Task<ActionResult> logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
}
