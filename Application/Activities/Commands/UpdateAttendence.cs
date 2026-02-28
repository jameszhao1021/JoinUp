using System;
using System.Diagnostics;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendence
{
    public class Command : IRequest<Result<string>>
    {
        public required string Id {get;set;}
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity =  await context.Activities
            .Include(x=>x.Attendees)
            .ThenInclude(x=>x.User)
            .FirstOrDefaultAsync(x=>x.Id == request.Id, cancellationToken);

            if(activity == null) return Result<string>.Failure("Activity not found",404);

            var user = await userAccessor.GetUserAsync();
    
            var attendence = activity.Attendees.FirstOrDefault(x=>x.UserId == user.Id);
            if (attendence != null)
            {
                if(attendence.IsHost == true){
                    Console.WriteLine("有参与者 + 是主人");
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else {
                    Console.WriteLine("有参与者 + 不是主人");

                    activity.Attendees.Remove(attendence); 
                }
            }
            else
            {
                    Console.WriteLine("无参与者");
              var attendee = new ActivityAttendee
                {
                    ActivityId = activity.Id,
                    UserId = user.Id,
                    IsHost = false
                };

                activity.Attendees.Add(attendee);
            }
                            

                var result =  await context.SaveChangesAsync(cancellationToken) > 0;
                return result?  Result<string>.Success(activity.Id)
                 : Result<string>.Failure("Problem updating the DB", 400)
                ;
        }
    }
}
