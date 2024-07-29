public class ParkLocator {
public static String[] country(String countryName) {
        ParkService.ParksImplPort parks = new ParkService.ParksImplPort();
    String[] parksname = parks.byCountry(countryName);
        return parksname;
    }
}