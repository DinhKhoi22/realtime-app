'use client'

import { FC ,Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import Button from './ui/Button'

interface ModalProps {
  parseMessages: string[]
  chatId: string
}

const Modal: FC<ModalProps> = ({ parseMessages, chatId }) => {
  const textAreaRef = useRef<HTMLAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false)
 
  const cancelButtonRef = useRef(null)

  const authToken = 'AYWsASQgZjhjZjVjNzQtYjIzMC00OWM5LTk1M2EtMGEyZTA4YjA2ZmM1ZTE4MWI1NWRiMWU1NGE2NmJmYmY1YzhiYTUyN2Q1ZDc='

  const handleDeleteChat = async () => {
    setIsLoading(true);
    try {
        await axios.post('/api/message/delete',
        { chatId, parseMessages },
        {    
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        });
  
        textAreaRef.current?.focus();
      } catch (error) {
        console.log('Post',error)
      } finally {
        setOpen(false)
        setIsLoading(false);
      }
  }

  return (
    <div
        className='active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 bg-slate-900 text-white hover:bg-slate-800 h-10 py-2'
    >
        <button onClick={() => setOpen(true)}>
            <Trash2 className='m-5'/>
        </button>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
    
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Delete Chat
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete chat? This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        isLoading={isLoading}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDeleteChat}
                      >
                        Delete Chat
                      </Button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
    </div>
  )
}

export default Modal;