using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File {get;set;}
    }

    public class Hander(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var photoResult = await photoService.UploadPhoto(request.File);
            if (photoResult != null)
            {
              var user = await userAccessor.GetUserAsync();
              var photo = new Photo
                            {
                                Url = photoResult.Url,
                                PublicId = photoResult.PublicId,
                                UserId = user.Id,
                              
                            };

            user.ImageUrl??=photo.Url;           
            context.Photos.Add(photo);
           var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (result)
                {
                    return Result<Photo>.Success(photo);
                }
            return Result<Photo>.Failure("Problem saving photo to DB",400);
            }
           return Result<Photo>.Failure("Failed to upload photo", 400);
        }
    }
}