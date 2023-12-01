package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class ScoresController {
  private final ScoresRepository scoreRepository;

  public ScoresController(ScoresRepository scoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  @PostMapping("/saveScore")
  @CrossOrigin(origins = "*")
  public String saveScore(@RequestBody Scores score) {
    if (score == null) {
      return "The score is invalid";
    }
    this.scoreRepository.save(score);
    return "success";
  }

  @GetMapping("/findAllScores")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Scores> findAllScores() {
    Iterable<Scores> scores = this.scoreRepository.findAll();
    List<Scores> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }

  // @GetMapping("/findAllScores")
  // @ResponseBody
  // @CrossOrigin(origins = "*")
  // public ResponseEntity<List<Scores>> findAllScores(
  //         @RequestParam(defaultValue = "0") int page,
  //         @RequestParam(defaultValue = "20") int size,
  //         @RequestParam(defaultValue = "id,desc") String sortBy
  // ) {
  //     // Use Spring Data JPA to fetch scores with pagination and sorting
  //     Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy.split(",")));
  //     Page<Scores> scorePage = scoreRepository.findAll(pageable);
  //     List<Scores> scores = scorePage.getContent();

  //     return new ResponseEntity<>(scores, HttpStatus.OK);
  // }


  // @GetMapping("/findHighScores")
  // @ResponseBody
  // @CrossOrigin(origins = "*")
  // public ResponseEntity<List<Scores>> findHighScores() {
  //     // Use Spring Data JPA to fetch high scores
  //     List<Scores> highScores = scoreRepository.findTopScores();

  //     return new ResponseEntity<>(highScores, HttpStatus.OK);
  // }


  @GetMapping("/findByPlayer")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Scores> findByPlayer(@RequestParam String player) {
    Iterable<Scores> scores = this.scoreRepository.findByPlayer(player);
    List<Scores> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }

  @GetMapping("/findByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Scores> findByUserId(@RequestParam String userId) {
    Iterable<Scores> scores = this.scoreRepository.findByUserId(userId);
    List<Scores> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }
}