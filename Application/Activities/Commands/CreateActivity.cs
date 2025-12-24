using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;


//old approach
// public class CreateActivity
// {
//     public class Command : IRequest<string>
//     {
//         public required CreateActivityDTO ActivityDto { get; set; }
//     }

//     public class Handler (AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
//     {
//         public async Task<string> Handle(Command request, CancellationToken cancellationToken)
//         {
//             var activity = mapper.Map<Activity>(request.ActivityDto);
//             context.Activities.Add(activity);
//             await context.SaveChangesAsync(cancellationToken);
//             return activity.Id;
//         }
//     }
// }


//new approach
public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDTO ActivityDto { get; set; }
    }

    public class Handler (AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);
            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if(result)
            {
                return Result<string>.Success(activity.Id);
            }
            else
            {
                return Result<string>.Failure("Failed to create the activity", 400);
            }
        }
    }
}
