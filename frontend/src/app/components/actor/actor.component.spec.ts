import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActorComponent } from "./actor.component";
import { MovieComponent } from "../movie/movie.component";

class MockActor {
  name: string = "Darin, Ricardo";
  nationality: string = "Argentinian";
  img_path: string = null;
}

describe("ActorComponent", () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;
  let mockActor: MockActor;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockActor = new MockActor();
    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    component.actor = mockActor;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
