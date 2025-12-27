
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            var activities = await Mediator.Send(new GetActivityList.Query());
            
            return Ok(activities);
        }

        [HttpGet("{id}")]

        //old approach
        // public async Task<ActionResult<Domain.Activity>> GetActivityDetails(string id)
        // {
        //     var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });

        //     return Ok(activity);
        // }


       // new approach, HandleResult is the method coming fromm baseApiController
        public async Task<ActionResult<Activity>> GetActivityDetails(string id)
        {
            var result = await Mediator.Send(new GetActivityDetails.Query { Id = id });
           
            return HandleResult(result);
        }

        [HttpPost]

        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
        {
            var result = await Mediator.Send(new CreateActivity.Command{ ActivityDto = activityDto });
            return HandleResult(result);

        }

        [HttpPut]

        public async Task<ActionResult<string>> EditActivity(EditActivityDTO activity)
        {
            var result = await Mediator.Send(new EditActivity.Command { ActivityDto = activity });
            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        
        public async Task<ActionResult<string>> DeleteActivity(string id)
        {
           var result =  await Mediator.Send(new DeleteActivity.Command { Id = id });
           return HandleResult(result);

        }
    }
}
