const Physics = {
  airResistance: 0.99,//The velocity of everything is multiplied by this number each frame.
  airResistanceSleeping: 0.9,//The air resistance of something that is "asleep".
  
  gravityForce: 0.7,//The magnitude of gravity
  
  constraintCompensation: 0.2,//The intensity of rigid constraints' compensation for oscillation.
  constraintAdjustment: 0.3,//How much rigid constraints adjust the 
  
  sleepThreshold: 2,//Maximum velocity at which any circle can be "asleep".
  
  circleAdjustment: 0.3
};
