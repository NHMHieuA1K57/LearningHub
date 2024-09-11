package swp.group2.learninghub.api;

import jakarta.servlet.http.HttpSession;
import swp.group2.learninghub.model.ResponseObject;
import swp.group2.learninghub.model.User;
import swp.group2.learninghub.service.FeatureService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/feature")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FeatureController {
    // variable and constructor section
    @Autowired
    HttpSession session;        
    @Autowired
    private final FeatureService service;

    @Autowired
    public FeatureController(FeatureService service) {
        this.service = service;
    }

    // api section
    @GetMapping("")
    public ResponseEntity<ResponseObject> showAll() {
        try {
            User sessionUser = (User) session.getAttribute("user");
            if (sessionUser != null && sessionUser.getRoleId().compareToIgnoreCase("ADMIN")==0) {
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Success",
                        "feature list", service.showAll()));
            } else {
                throw new IllegalArgumentException("User information for session not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseObject("Fail",
                    "Can not retrieve feature information", e.getMessage()));
        }
    }

    // this api will allow admin to activate or deactivate feature of the app
    @PutMapping("/active")
    ResponseEntity<ResponseObject> setActive(@RequestParam("id") int featureId, @RequestParam("mess") String message) {
        try {
            User sessionUser = (User) session.getAttribute("user");
            if (sessionUser != null && sessionUser.getRoleId().compareToIgnoreCase("ADMIN")==0) {
                if (sessionUser.getRoleId().compareToIgnoreCase("ADMIN") == 0) {
                    service.setActive(featureId, message);
                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Success",
                            "Active status changed successfully feature id: " + featureId, message));
                } else {
                    throw new IllegalArgumentException("User unauthorized");
                }
            } else {
                throw new IllegalArgumentException("User information for session not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("Fail",
                    "Fail to change active status", e.getMessage()));
        }
    }
}
