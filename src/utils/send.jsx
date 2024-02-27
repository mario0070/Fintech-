import React from 'react'

export default function Send({closeSheet, findUser, accountFetch, userFetch, isFound, sendingTX, actions, user, depositTX}) {
    return (
      <div className="bottom_sheet" id='bottom_sheet'>
      <div className="contents" id='sheet'>
        { actions == "send" &&
          <>
          <div className="sheet_head d-flex">
            <h2 className='text-center'>Send Money</h2>
            <button className="btn-close" onClick={closeSheet}></button>
          </div>

          <div className="form">
          <form action="" onSubmit={sendingTX}>
            <div className='grp'>
                <label htmlFor="">Recipient Email Address</label>
                <input required onChange={findUser} type="email" placeholder='Email address' />
              </div>

              <div className="name d-flex mb-4">
                {accountFetch &&
                  <div class="spinner-border text-dark mt-2 spinner-border-sm"></div>
                }
                {isFound &&
                  <p className="mb-0 mx-2 text-dark text-capitalize">
                    {userFetch}
                  </p>
                }
              </div>

              <div className='grp mb-4'>
                <label htmlFor="">Amount</label>
                <input required type="text" placeholder='$10 - $5,000,000' />
              </div>

              <button className='btn submit btn-dark'>Confirm Transaction</button>

          </form>
          </div>
          </>
        }

        { actions == "withdraw" &&
          <>
          <div className="sheet_head d-flex">
            <h2 className='text-center'>Withdraw Money</h2>
            <button className="btn-close" onClick={closeSheet}></button>
          </div>

          <div className="form mt-5">
            <div className="text-center">
              <h2 className='text-dark text-muted'>Coming Soon !!</h2>
              <p className="text-muted">This feature is not yet available</p>
            </div>
          </div>
          </>
        }

        { actions == "deposit" &&
          <>
          <div className="sheet_head d-flex">
            <h2 className='text-center'>Deposit Money</h2>
            <button className="btn-close" onClick={closeSheet}></button>
          </div>

          <div className="form">
            <form action="" onSubmit={depositTX}>
              <div className='grp mb-4'>
                  <label htmlFor="">Receiving Email Address</label>
                  <input required readOnly type="email" placeholder='Email address' value={user.email} />
                </div>

                <div className='grp mb-4'>
                  <label htmlFor="">Amount</label>
                  <input required type="text" placeholder='$10 - $5,000,000' />
                </div>

                <button className='btn submit btn-dark'>Confirm Transaction</button>

            </form>
          </div>
          </>
        }

      </div>
    </div>
    )
}
