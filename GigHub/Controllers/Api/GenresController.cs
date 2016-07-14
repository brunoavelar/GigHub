using AutoMapper;
using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [RoutePrefix("api/genres")]
    [Authorize]
    public class GenresController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public GenresController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IEnumerable<GenreDto> Get()
        {
            var genres = unitOfWork.Genres.GetGenres();

            return genres.Select(g => Mapper.Map<Genre, GenreDto>(g));
        }
    }
}
