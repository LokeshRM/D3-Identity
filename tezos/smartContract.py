import smartpy as sp

class User(sp.Contract):
    def __init__(self):
        self.init(
            users = sp.big_map(tkey = sp.TAddress, tvalue = sp.TRecord(
                name = sp.TString,
                email = sp.TString,
                phone = sp.TString,
                address = sp.TString,
                aadhaar = sp.TString
            ))
        )
        
    @sp.entry_point
    def add_user(self, params):
        self.data.users[params.tezos_address] = sp.record(
            name = params.name,
            email = params.email,
            phone = params.phone,
            address = params.address,
            aadhaar = params.aadhaar
        )
        
    @sp.entry_point
    def edit_user(self, params):
        user_info = sp.get(self.data.users, params.tezos_address)
        if params.name is not None:
            user_info.name = params.name
        if params.email is not None:
            user_info.email = params.email
        if params.phone is not None:
            user_info.phone = params.phon
        if params.address is not None:
            user_info.address = params.address
        if params.aadhaar is not None:
            user_info.aadhaar = params.aadhaar
        self.data.users[params.tezos_address] = user_info

@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()
    
    user = User()
    alice = sp.test_account("alice")

    scenario += user
    # Test adding a new user
    scenario += user.add_user(
        tezos_address = sp.address("tz1abc123"),
        name = "John Doe",
        email = "johndoe@example.com",
        phone = "123-456-7890",
        address = "123 Main St, Anytown USA",
        aadhaar = "123456789012"
    )
    assert user.data.users[sp.address("tz1abc123")].name == "John Doe"
    
    # Test editing a user's name
    scenario.h1("Test edit user name")
    scenario += user.edit_user(
        tezos_address = sp.address("tz1abc123"),
        name = "Jane Doe"
    )
    assert user.data.users[sp.address("tz1abc123")].name == "Jane Doe"
    
    # Test editing a user's email and phone
    scenario.h1("Test edit user email and phone")
    scenario += user.edit_user(
        tezos_address = sp.address("tz1abc123"),
        email = "janedoe@example.com",
        phone = "987-654-3210"
    )
    assert user.data.users[sp.address("tz1abc123")].email == "janedoe@example.com"
    assert user.data.users[sp.address("tz1abc123")].phone == "987-654-3210"
