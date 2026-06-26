using System;
using Application.Profiles.DTOs;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    
    Task<PhotoUploadResult?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoeo(string publicId);
}

