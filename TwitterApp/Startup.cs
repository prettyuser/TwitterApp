using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TwitterApp.Startup))]
namespace TwitterApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
