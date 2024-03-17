import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { IUser } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersRepository', () => {
  let provider: UsersRepository;

  const userData: Partial<IUser> = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    password: faker.internet.password(),
  };

  const expectedUser: User = new User({
    ...userData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedUsers: User[] = [expectedUser];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedUsers),
    findOne: jest.fn().mockResolvedValue(expectedUser),
    create: jest.fn().mockReturnValue(expectedUser),
    save: jest.fn().mockResolvedValue(expectedUser),
    preload: jest.fn().mockResolvedValue(expectedUser),
    remove: jest.fn().mockResolvedValue(expectedUser.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(User)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await provider.findAll();
      expect(result).toEqual(expectedUsers);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await provider.findOne(expectedUser.id);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: expectedUser.id },
      });
    });
    it('should throw a NotFoundException if no user is found', async () => {
      mockRepository.findOne.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.findOne(expectedUser.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a new user with valid parameters', async () => {
      const newUser = await provider.create(userData);
      expect(newUser).toEqual(expectedUser);
      expect(mockRepository.create).toHaveBeenCalledWith(userData);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedUser);
    });
  });

  describe('update', () => {
    it('should update a user with valid parameters', async () => {
      const updatedUser = await provider.update(expectedUser.id, userData);
      expect(updatedUser).toEqual(expectedUser);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: expectedUser.id,
        ...userData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedUser);
    });
    it('should throw a NotFoundException if no user is found', async () => {
      mockRepository.preload.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.update(expectedUser.id, userData);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = await provider.delete(expectedUser.id);
      expect(result).toEqual(expectedUser.id);
      expect(mockRepository.remove).toHaveBeenCalledWith(expectedUser);
    });
    it('should throw a NotFoundException if no user is found', async () => {
      mockRepository.remove.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.delete(expectedUser.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
