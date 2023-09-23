function UserProfile({ user }) {

  return (
    <section>
      <h2>{user.username}</h2>
      <p>budgets</p>
      <p>{user.budgetCount}</p>
    </section>
  );
}

export default UserProfile;
