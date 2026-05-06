require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    user = User.new(email: "newuser@gmail.com", password: "password")
    assert user.valid?
  end

  test "should not save user without email" do
    user = User.new(password: "password")
    assert_not user.save, "Saved the user without an email"
  end

  test "should not save user with duplicate email" do
    # users(:one) lấy từ file fixtures/users.yml
    user = User.new(email: users(:one).email, password: "password")
    assert_not user.save, "Saved the user with a duplicate email"
  end
end
