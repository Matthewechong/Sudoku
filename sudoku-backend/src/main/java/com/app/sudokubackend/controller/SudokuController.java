package com.app.sudokubackend.controller;

import java.security.Principal;
import java.util.Map;

import javax.swing.RepaintManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.sudokubackend.models.SudokuEntity;
import com.app.sudokubackend.models.User;
import com.app.sudokubackend.services.GameService;
import org.springframework.web.servlet.view.RedirectView;
@RestController
public class SudokuController {

    @Value("${allowed.origins}")
    private String allowedOrigins;

    @Value("${base.url}")
    private String baseurl;

    @Autowired
    GameService gameService;

    @CrossOrigin("${allowed.origins}")
    @PostMapping("/api/save")
    ResponseEntity<String> saveGame(@RequestBody Map<String, Object> gameState) {
        try {
            System.out.println(gameState.toString());
            gameService.saveGame(gameState);
            return ResponseEntity.ok("Game State Saved");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @CrossOrigin("${allowed.origins}")
    @GetMapping("/api/load/{id}")
    ResponseEntity<Object> loadGame(@PathVariable Long id) {
        try {
            SudokuEntity sudokuEntity = gameService.loadGame(id);
            return ResponseEntity.ok(sudokuEntity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @CrossOrigin("${allowed.origins}")
    @GetMapping("/api/user")
    ResponseEntity<Object> currentUser(Authentication authentication) {
        String givenName = " ";

        if (authentication != null) {
            if (authentication.getPrincipal() instanceof OAuth2User) {
                OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

                // Github Username
                givenName = oAuth2User.getAttribute("login");
                System.out.println(oAuth2User.getAttributes());

                // Google's Name
                if (givenName == null) {
                    givenName = (String) oAuth2User.getAttributes().get("given_name");
                }
            } else if (authentication.getPrincipal() instanceof String) {
                givenName = (String) authentication.getPrincipal();
            }
        }

        return ResponseEntity.ok(new User(givenName));
    }
    @GetMapping("/")
    public RedirectView redirectToNewURL() {
        String newURL = baseurl;
        return new RedirectView(newURL);
    }

}
