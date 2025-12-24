using System;
using System.Diagnostics;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;


//old approach
// public class DeleteActivity
// {
//      public class Command : IRequest<string>
//     {
//         public required string Id { get; set; }
//     }

//      public class Handler (AppDbContext context) : IRequestHandler<Command, string>
//     {
//         public async Task<string> Handle(Command request, CancellationToken cancellationToken)
//         {
//             var activity = await context.Activities.FindAsync(request.Id,cancellationToken) ?? throw new Exception("No match Id");
//             context.Activities.Remove(activity);
//             await context.SaveChangesAsync(cancellationToken);
//             return request.Id;
//         }
//     }
// }
public class DeleteActivity
{
     public class Command : IRequest<Result<string>>
    {
        public required string Id { get; set; }
    }

     public class Handler (AppDbContext context) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id,cancellationToken);
            if(activity == null) return Result<string>.Failure("Acitivity not found",404);

            context.Activities.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if(result)
            {
                return Result<string>.Success(activity.Id);
            }
            else
            {
                return Result<string>.Failure("Failed to delete the activity", 400);
            }
            
            }
        }
    }
