function UserProfile({ user }) {

  return (
    <section id="user-profile">
      <h2>{user.username}</h2>
      <p>budgets</p>
      <p>{user.budgetCount}</p>
    </section>
  );
}

export default UserProfile;
