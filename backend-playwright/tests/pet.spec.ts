import { test, expect } from '@playwright/test';
import { PetService } from '../services/pet.service';

let petId: number;

test.describe('Pet API Tests', () => {

  test('POST create pet', async ({ request }) => {
    const pets = new PetService(request);
    petId = Date.now();
    const response = await pets.createPet({
      id: petId,
      name: "playwright-dog",
      status: "available"
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('GET pet by id', async ({ request }) => {
    const pets = new PetService(request);
    const response = await pets.getPetById(petId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('PUT update pet', async ({ request }) => {
    const pets = new PetService(request);
    const response = await pets.updatePet({
      id: petId,
      name: "updated-playwright-dog",
      status: "sold"
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('GET pets by status', async ({ request }) => {
    const pets = new PetService(request);
    const response = await pets.findPetsByStatus("sold");
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('DELETE pet', async ({ request }) => {
    const pets = new PetService(request);
    const response = await pets.deletePet(petId);
    expect(response.status()).toBe(200);
  });

});

test('Get pet by id', async ({ request }) => {
  const petService = new PetService(request);
  const response = await petService.getPetById(1);
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
});