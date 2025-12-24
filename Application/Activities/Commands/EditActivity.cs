using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;


namespace Application.Activities.Commands;


//Old approach
// public class EditActivity
// {
//     public class Command : IRequest<string>
//     {
//         public required Activity Activity { get; set; }
//     }

//     public class Handler (AppDbContext context, IMapper mapper): IRequestHandler<Command, string>
//     {
//         public async Task<string> Handle(Command request, CancellationToken cancellationToken)
//         {
//             var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Cannot find activity");

//             mapper.Map(request.Activity, activity);
//             await context.SaveChangesAsync(cancellationToken);
//             return request.Activity.Id;
//         }
//     }
// }


// new approach
public class EditActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler (AppDbContext context, IMapper mapper): IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken);

            if(activity == null) return Result<string>.Failure("Activity not found", 404);
            mapper.Map(request.Activity, activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (result)
            {
                return Result<string>.Success(activity.Id);
            }
            else
            {
                return Result<string>.Failure("Failed to update the activity", 400);
            }

        }
    }
}
