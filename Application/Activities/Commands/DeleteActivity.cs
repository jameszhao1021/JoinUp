using System;
using System.Diagnostics;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
     public class Command : IRequest<string>
    {
        public required string Id { get; set; }
    }

     public class Handler (AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id,cancellationToken) ?? throw new Exception("No match Id");
            context.Activities.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
    }
}
