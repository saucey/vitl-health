import { Component, OnInit } from "@angular/core";

const experts = [
  {
    image: "https://static.vitl.com/assets/images/experts/Experts08.png",
    name: "Dr Monal Wadhera",
    position: "Medical Director",
  },
  {
    image: "https://static.vitl.com/assets/images/experts/Experts01.png",
    name: "Alli Godbold",
    position: "Nutritional Therapist",
  },
  {
    image: "https://static.vitl.com/assets/images/experts/Experts03.png",
    name: "Kathryn Fielding",
    position: "Nutritional Therapist",
  },
  {
    image: "https://static.vitl.com/assets/images/experts/Experts10.png",
    name: "Roxane Bakker",
    position: "Dietitian",
  },
  {
    image: "https://static.vitl.com/assets/images/experts/Experts07.png",
    name: "Dr Monika Mozere",
    position: "Geneticist",
  },
  {
    image: "https://static.vitl.com/assets/images/experts/Experts09.png",
    name: "Dr Nathan Curran",
    position: "Medical Doctor",
  },
];

@Component({
  selector: "app-expert-squares",
  templateUrl: "./expert-squares.component.html",
  styles: [],
})
export class ExpertSquaresComponent implements OnInit {
  experts;

  ngOnInit() {
    this.experts = experts;
  }
}
