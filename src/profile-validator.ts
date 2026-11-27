type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

const userWithNotifications: UserProfile = {
  id: 1,
  username: 'lameck',
  settings: {
    notifications: true,
  },
};

const userWithoutSettings: UserProfile = {
  id: 2,
  username: 'alex',
};

const userWithEmptySettings: UserProfile = {
  id: 3,
  username: 'laura',
  settings: {},
};

const user4: UserProfile = {
  id: 4,
  username: 'David',
  settings: {
    notifications: false,
  },
};

function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

console.log('User 1 (notifications set):', isNotified(userWithNotifications));
console.log('User 2 (no settings):', isNotified(userWithoutSettings));
console.log('User 3 (empty settings):', isNotified(userWithEmptySettings));
console.log('User 4 (notifications explicitly false):', isNotified(user4));