using System;
using MediatR;
using Domain;
using System.Reflection.Metadata.Ecma335;
using Persistence;
using Application.Core;
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
    public class Query: IRequest<Result<Activity>>
    {   
        public required string Id { get;  set; }
    };

    public class Handler (AppDbContext context): IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id, cancellationToken);

            if(activity == null) return Result<Activity>.Failure("Activity not found", 404);
           
            return  Result<Activity>.Success(activity);
        }
    }
}