using Moq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;

namespace GigHub.IntegrationTests.Extensions
{
    public static class ControllerExtensions
    {
        public static void MockCurrentUser(this Controller controller, string userId, string userName)
        {
            var identity = new GenericIdentity(userName);
            identity.AddClaim(
                new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", userName)
                );

            identity.AddClaim(
                new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", userId)
                );

            var principal = new GenericPrincipal(identity, null);

            var mockHttpContext = new Mock<HttpContextBase>();
            mockHttpContext.SetupGet(c => c.User).Returns(principal);

            var mockControllerContext = new Mock<ControllerContext>();
            mockControllerContext.SetupGet(c => c.HttpContext).Returns(mockHttpContext.Object);

            controller.ControllerContext = mockControllerContext.Object;
        }

        public static void MockCurrentUser(this ApiController controller, string userId, string userName)
        {
            var identity = new GenericIdentity(userName);
            identity.AddClaim(
                new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", userName)
                );

            identity.AddClaim(
                new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", userId)
                );

            var principal = new GenericPrincipal(identity, null);

            controller.User = principal;
        }
    }
}
