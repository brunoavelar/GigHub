using AutoMapper;
using GigHub.Core.Dtos;
using GigHub.Core.Models;

namespace GigHub.App_Start
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

        }

        protected override void Configure()
        {
            CreateMap<ApplicationUser, UserDto>();
            CreateMap<Notification, NotificationDto>();
            CreateMap<Genre, GenreDto>();
            CreateMap<Gig, GigDto>();

            //var config = new MapperConfiguration(cfg => {
            //    cfg.CreateMap<ApplicationUser, UserDto>();
            //    cfg.CreateMap<Notification, NotificationDto>();
            //    cfg.CreateMap<Genre, GenreDto>();
            //    cfg.CreateMap<Gig, GigDto>();
            //});
        }
    }
}