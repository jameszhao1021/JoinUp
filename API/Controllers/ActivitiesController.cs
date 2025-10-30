using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities.Queries;
using Application.Activities.Commands;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
        {
            var activities = await Mediator.Send(new GetActivityList.Query());
            return Ok(activities);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Domain.Activity>> GetActivityDetails(string id)
        {
            var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });
            return Ok(activity);
        }

        [HttpPost]

        public async Task<ActionResult<string>> CreateActivity(Domain.Activity activity)
        {
            var id = await Mediator.Send(new CreateActivity.Command { Activity = activity });
            return Ok(id);
        }

        [HttpPut]

        public async Task<ActionResult<string>> EditActivity(Domain.Activity activity)
        {
            var id = await Mediator.Send(new EditActivity.Command { Activity = activity });
            return Ok(id);
        }

        [HttpDelete("{id}")]
        
        public async Task<ActionResult<string>> DeleteActivity(string id)
        {
            await Mediator.Send(new DeleteActivity.Command { Id = id });
            return Ok(id);
        }
    }
}
