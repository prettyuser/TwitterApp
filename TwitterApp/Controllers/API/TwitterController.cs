using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TweetSharp;

namespace TwitterApp.Controllers.API
{
    public class Tweet
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class TwitterController : ApiController
    {
        private string ConsumerKey = ConfigurationManager.AppSettings["ConsumerKey"];
        private string ConsumerSecret = ConfigurationManager.AppSettings["ConsumerSecret"];
        private string AccessToken = ConfigurationManager.AppSettings["AccessToken"];
        private string AccessTokenSecret = ConfigurationManager.AppSettings["AccessTokenSecret"];

        [HttpGet]
        public async Task<IHttpActionResult> GetTweets(string hash = null)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(hash))
                    return Ok(new Tweet[] { });

                TwitterService service = new TwitterService();

                service.AuthenticateWith(ConsumerKey, ConsumerSecret, AccessToken, AccessTokenSecret);

                if (!hash.StartsWith("#"))
                    hash = "#" + hash;

                TwitterSearchResult tweets = service.Search(new SearchOptions { Q = hash });

                if (tweets == null)
                    return Ok(new Tweet[] { });

                return Ok(tweets.Statuses.Select(x => new Tweet { Text = x.Text, Id = x.Id }).ToArray());
            }
            catch (Exception e)
            {
                return Ok(new Tweet[] { });
            }
        }

    }
}