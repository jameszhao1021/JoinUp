using System;
using System.Diagnostics;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;
namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Domain.Activity, Domain.Activity>();
        CreateMap<CreateActivityDTO, Domain.Activity>();

    }
}
