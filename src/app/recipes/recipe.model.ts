export class Recipe{
  public name:string;
  public descriptions: string;
  public imagePath: string;


  constructor(name:string,desc:string,imagePath:string){

    this.name=name;
    this.descriptions=desc;
    this.imagePath=imagePath;
  }

}
