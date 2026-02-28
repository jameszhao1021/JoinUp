using MediatR;
using Persistence;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Application.Activities.DTOs;
using AutoMapper;
namespace Application.Activities.Queries;

//old approach, return activity in handler
// public class GetActivityDetails
// {
//     public class Query: IRequest<Activity>
//     {   
//         public required string Id { get;  set; }
//     };

//     public class Handler (AppDbContext context): IRequestHandler<Query, Activity>
//     {
//         public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
//         {
//             var activity = await context.Activities.FindAsync(request.Id, cancellationToken) ?? throw new Exception("Activity not found");
           
//             return activity;
//         }
//     }
// }

// new approach, return object including result to controller, then controler send http response based on the result object

public class GetActivityDetails
{
    public class Query: IRequest<Result<ActivityDto>>
    {   
        public required string Id { get;  set; }
    };

    public class Handler (AppDbContext context, IMapper mapper): IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
            .Include(x=>x.Attendees)
            .ThenInclude(x=>x.User)
            .FirstOrDefaultAsync(x=>x.Id == request.Id, cancellationToken);

            if(activity == null) return Result<ActivityDto>.Failure("Activity not found", 404);
           
            return  Result<ActivityDto>.Success(mapper.Map<ActivityDto>(activity));
        }
    }
}
