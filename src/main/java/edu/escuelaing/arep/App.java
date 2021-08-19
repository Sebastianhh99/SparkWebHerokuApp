package edu.escuelaing.arep;

import spark.Request;
import spark.Response;
import static spark.Spark.*;

import org.json.JSONObject;

import edu.escuelaing.arep.service.DataService;
import edu.escuelaing.arep.service.DataServiceImplement;

/**
 * Hello world!
 *
 */
public class App 
{
    private static DataService dataService = new DataServiceImplement();
    /**
     * This method reads the default port as specified by the PORT variable in
     * the environment.
     *
     * Heroku provides the port automatically so you need this to run the
     * project on Heroku.
     */
    static int getPort() {
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 4567; //returns default port if heroku-port isn't set (i.e. on localhost)
    }

    public static void main(String[] args) {
        staticFiles.location("/public");
        port(getPort());
        options("/*",
        (request, response) -> {

            String accessControlRequestHeaders = request
                    .headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers",
                        accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request
                    .headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods",
                        accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
        post("/api/facadealpha","application/json",(req,res) -> facadeAlpha(req, res));
    }

    private static JSONObject facadeAlpha(Request req, Response res) {
        JSONObject data = new JSONObject(req.body());
        return dataService.getDataAlpha(data.getString("symbol"),data.getString("function"));
    }
}
