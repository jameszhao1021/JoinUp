using Application.Activities.Commands;
using Application.Activities.DTOs;
using Domain;
using FluentValidation;

namespace Application.Activities.Validator;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDTO>
{
    public EditActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x=>x.ActivityDto.Id).NotEmpty().WithMessage("Id is required");
    }
}

