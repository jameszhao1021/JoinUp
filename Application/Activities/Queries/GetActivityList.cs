using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Activities.Queries;


public class GetActivityList
{
    public class Query : IRequest<List<ActivityDto>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ActivityDto>>{
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
           var activities = await context.Activities
                             .Include(x=>x.Attendees)
                             .ThenInclude(x=>x.User)
                            .ToListAsync(cancellationToken);
            return mapper.Map<List<ActivityDto>>(activities);
        }
    }
}


